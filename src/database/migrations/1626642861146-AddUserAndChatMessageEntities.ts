import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserAndChatMessageEntities1626642861146
  implements MigrationInterface
{
  name = 'AddUserAndChatMessageEntities1626642861146';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "chat_message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT '"2021-07-18T21:14:23.460Z"', "updatedAt" TIMESTAMP DEFAULT now(), "body" character varying(256) NOT NULL, "room" character varying(16) NOT NULL, "authorId" uuid, CONSTRAINT "PK_3cc0d85193aade457d3077dd06b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT '"2021-07-18T21:14:23.460Z"', "updatedAt" TIMESTAMP DEFAULT now(), "email" character varying(64) NOT NULL, "name" character varying(64) NOT NULL, "password" character varying(64) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "chat_message" ADD CONSTRAINT "FK_a903a8a4b209d820a333e6d537c" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "chat_message" DROP CONSTRAINT "FK_a903a8a4b209d820a333e6d537c"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "chat_message"`);
  }
}
