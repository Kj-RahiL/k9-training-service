import config from '../config';
import { USER_ROLE, USER_STATUS } from '../modules/User/user.constant';
import { User } from '../modules/User/user.model';

export const autoUser = async () => {
  try {
    const admin = await User.findOne({
      role: USER_ROLE.admin,
      email: config.admin_email,
      status: USER_STATUS.active,
    });
    if (!admin) {
      console.log('Admin Created started...');

      await User.create({
        name: 'Admin',
        role: USER_ROLE.admin,
        email: config.admin_email,
        password: config.admin_pass,
        status: USER_STATUS.active,
      });
      console.log('Admin created successfully...');
    }
  } catch (error) {
    console.log('Error in Admin Created', error);
  }
};
