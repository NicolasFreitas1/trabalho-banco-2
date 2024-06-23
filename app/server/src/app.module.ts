import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { DocumentTypesModule } from './document-types/document-types.module';
import { DocumentsModule } from './documents/documents.module';
import { TagModule } from './tag/tag.module';

@Module({
    imports: [UsersModule, DatabaseModule, DocumentTypesModule, DocumentsModule, TagModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
