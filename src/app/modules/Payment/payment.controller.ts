import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PaymentService } from './payment.service';

const checkOut = catchAsync(async (req, res) => {
  const {items}=req.body
  console.log(items, 'he')
  const result = await PaymentService.checkOutIntoDB(items);
  console.log(result, "ree")
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Payment is pending!',
    data: result,
  });
  res.redirect(result.url as string)
});

export const PaymentController = {
  checkOut,
};
