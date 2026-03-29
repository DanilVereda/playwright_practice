export function getSidForUser(user: string): string {
  const storageState = require(`../../test-data/states/${user}.json`);
  const cookie = storageState.cookies[0].value;
  return cookie;
}
