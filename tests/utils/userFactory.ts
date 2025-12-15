export type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export function generateUser(password: string = 'TestPass1234!'): UserData {
  const timestamp = Date.now();
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomString = Array.from({ length: 6 }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
  return {
    firstName: `Test${randomString}`,
    lastName: `User${randomString}`,
    email: `test${timestamp}@test.pl`,
    password,
  };
}
