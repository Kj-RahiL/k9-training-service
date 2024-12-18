import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  base_url: process.env.BASE_URL,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expire_in: process.env.JWT_ACCESS_EXPIRE_IN,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_refresh_expire_in: process.env.JWT_REFRESH__EXPIRE_IN,
  admin_email: process.env.Admin_Email,
  admin_pass: process.env.Admin_pass,
  stripe_published_key: process.env.STRIPE_PUBLISHED_KEY,
  stripe_secret_key: process.env.STRIPE_SECRET_KEY,
};
