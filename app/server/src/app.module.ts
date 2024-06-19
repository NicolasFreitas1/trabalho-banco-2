import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { DocumentTypesModule } from './document-types/document-types.module';

@Module({
    imports: [UsersModule, DatabaseModule, DocumentTypesModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
