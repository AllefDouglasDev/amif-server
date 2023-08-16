import { PrismaClient } from '@prisma/client';
import { EncryptionService } from '../src/common/encryption/encryption.service';
import { IdGenerator } from '../src/common/id-generator';

const prisma = new PrismaClient();

async function main() {
  const encryptionService = new EncryptionService();
  const password = await encryptionService.encrypt('$ecreT123');
  const admin = await prisma.users.create({
    data: {
      id: IdGenerator.generateUUID(),
      username: 'admin',
      password,
    },
  });
  console.log({ admin });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
