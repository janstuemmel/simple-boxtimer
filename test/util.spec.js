import { secondsToMinutes } from '../src/util'

it('should convert seconds to minutes', () => {

  // then
  expect(secondsToMinutes(90)).toBe('01:30')
  
  // then
  expect(secondsToMinutes(180)).toBe('03:00')

  // then
  expect(secondsToMinutes(300)).toBe('05:00')

  // then
  expect(secondsToMinutes(3000)).toBe('50:00')
})