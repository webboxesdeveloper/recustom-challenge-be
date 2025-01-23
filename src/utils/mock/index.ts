import { UserRole } from '../../user/enum/role.enum';

export default [
  {
    name: 'alex',
    email: 'alex@example.com',
    password: '123456',
    role: UserRole.USER,
    activityLog: {
      logins: 4,
      downloads: 10,
    },
  },
  {
    name: 'alex1',
    email: 'alex1@example.com',
    password: '123456',
    role: UserRole.USER,
    activityLog: {
      logins: 5,
      downloads: 3,
    },
  },
  {
    name: 'alex2',
    email: 'alex2@example.com',
    password: '123456',
    role: UserRole.USER,
    activityLog: {
      logins: 1,
      downloads: 5,
    },
  },
  {
    name: 'alex3',
    email: 'alex3@example.com',
    password: '123456',
    role: UserRole.USER,
    activityLog: {
      logins: 8,
      downloads: 3,
    },
  },
  {
    name: 'alex4',
    email: 'alex4@example.com',
    password: '123456',
    role: UserRole.USER,
    activityLog: {
      logins: 3,
      downloads: 2,
    },
  },
]