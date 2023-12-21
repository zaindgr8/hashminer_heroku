import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
// import { User } from './entities/user.entity';
import { IUser } from './user.interface';


describe("User Services Test",()=>{

    let userService : UserService;
    let model : User;
    let mocUserService = {
        create : jest.fn(),
        login : jest.fn()
    }
    

    let mocUser = {
        // _id:"ewoifjfweoifjccmsi",
        name: 'new',
        email: 'new@gmail.com',
        password:"newpppp",
    }

    beforeEach(async ()=> {
        const app: TestingModule = await Test.createTestingModule({
            providers: [UserService,
                {
                    provide: getModelToken("User"),
                    useValue: mocUserService,
                  }
            ],
          }).compile();
      userService  =  app.get<UserService>(UserService);

    })
    
    it("user service should be defined",()=>{
        expect(userService).toBeDefined();
    })
     
    it( "i should create user",async () =>{
        const createUserDto = {
        name: 'new',
        email: 'new@gmail.com',
        password:"newpppp"
        }
         
        jest.spyOn(userService, 'registerUser').mockResolvedValue(mocUser);

        const createdUser = await userService.registerUser(createUserDto);
    
        expect(createdUser).toEqual(mocUser);

    })

       
    it("should login user", async () => {
         const loginInfo = {
            email:"asasd",
            password:"dsadadsas"
         }

         const moc_jwt_token = "aeoiuwerfieufnheriuneiurnfieurnfieurfnheirufnreiufniureiubquepwjcnw";

         jest.spyOn(userService,'login').mockResolvedValue(moc_jwt_token);

         const jwt_token = await  userService.login(loginInfo);
           
          expect(userService.login).toHaveBeenCalled();

         expect(jwt_token).toEqual(moc_jwt_token)
    }) 

})

