import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PaymentService } from "./payment.service";

const checkOut = catchAsync(async(req,res)=>{
    const result = await PaymentService.checkOutIntoDB()
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Payment successfully!",
      data: result,
    });
})


export const PaymentController = {
    checkOut
}