import {IsLength, IsEmail} from "validator.ts/decorator/Validation";
import {IAddUserReq} from "../../interfaces/user-service";

class authenticate {
    @IsEmail()
    email: string = ''; // TODO: It sucks to have to initialize these

    @IsLength(6, 20)
    password: string = '';
}

class create implements IAddUserReq {
  @IsLength(3, 20)
  fname: string = '';

  @IsLength(3, 20)
  lname: string = '';

  @IsLength(6, 20)
  username: string = '';

  @IsLength(6, 20)
  password: string = '';

  @IsEmail()
  email: string = '';
}


const UsersController = {
  authenticate, 
  create,
};

export default UsersController