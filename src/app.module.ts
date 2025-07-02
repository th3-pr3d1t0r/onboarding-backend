// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // <-- New: This helps connect to MongoDB
import { ConfigModule } from '@nestjs/config';   // <-- New: This helps read .env files
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // This line tells NestJS to load settings from your .env file
    // `isGlobal: true` means these settings will be available everywhere in your app
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // This line tells NestJS to connect to your MongoDB database
    // It uses the MONGO_URI from your .env file
    MongooseModule.forRoot(process.env.MONGO_URI ?? (() => { throw new Error('MONGO_URI is not defined in environment variables'); })()),
    // We'll add other modules here later, like for Users, Courses, etc.
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}