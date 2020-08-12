import Timer from '../src/timer'

it('should tick - default prep time 6', () => {

  // given
  const t = new Timer(5, 2)

  // then
  expect(t.time).toBe(6)
  expect(t.isPrep).toBe(true)

  // when
  t.tick()
  
  // then
  expect(t.time).toBe(5)
  expect(t.isPrep).toBe(true)
})

it('should tick - custom prep time', () => {
  
  // given
  const t = new Timer(5, 2, 2)

  // then
  expect(t.time).toBe(2)
  expect(t.isPrep).toBe(true)

  // when
  t.tick()
  
  // then
  expect(t.time).toBe(1)
  expect(t.isPrep).toBe(true)
})

it('should tick - prep time 0', () => {
  
  // given
  const t = new Timer(5, 2, 0)

  // then
  expect(t.time).toBe(0)
  expect(t.isPrep).toBe(true)
  expect(t.isTurn).toBe(false)
  
  // when
  t.tick()
  
  // then
  expect(t.time).toBe(5)
  expect(t.isPrep).toBe(false)
  expect(t.isPause).toBe(false)
  expect(t.isTurn).toBe(true)
})

it('should tick - turn to pause', () => {
  
  // given
  const t = new Timer(5, 2, 0)

  // then
  expect(t.time).toBe(0)
  expect(t.isPrep).toBe(true)
  expect(t.isTurn).toBe(false)
  
  // when

  // initial tick
  t.tick()

  // ticking training time
  t.tick()
  t.tick()
  t.tick()
  t.tick()
  t.tick()
  
  // then
  expect(t.time).toBe(2)
  expect(t.isPrep).toBe(false)
  expect(t.isPause).toBe(true)
  expect(t.isTurn).toBe(true)
})

it('should tick - increment rounds', () => {
  
  // given
  const t = new Timer(5, 2, 0)

  // then
  expect(t.time).toBe(0)
  expect(t.isPrep).toBe(true)
  expect(t.isTurn).toBe(false)
  
  // when

  // initial tick
  t.tick()

  // ticking training time
  t.tick()
  t.tick()
  t.tick()
  t.tick()
  t.tick()
  
  // ticking pause time
  t.tick()
  t.tick()

  // then
  expect(t.rounds).toBe(2)
  expect(t.time).toBe(5)
  expect(t.isPrep).toBe(false)
  expect(t.isPause).toBe(false)
  expect(t.isTurn).toBe(true)
})