import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://carlos8788:ePiz7gwfi4r9a3Ke@cluster0.wrgsfdb.mongodb.net/react-nest-mongo?retryWrites=true&w=majority',
    ),
    TasksModule,
  ],
})
export class AppModule {}
