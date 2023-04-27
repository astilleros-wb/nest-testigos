import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { AddService } from './add.service';
import { CreateAddDto } from './dto/create-add.dto';

@Processor('AddScrappedQueue')
export class AddScrappedWorker extends WorkerHost {
  constructor(private readonly addService: AddService) {
    super();
  }

  async process(job: Job<CreateAddDto, any, string>): Promise<any> {
    console.log('AddScrappedQueue@process', job.data.url);

    // SCRAP URL
    const add = await this.addService.upsertFromScrapper(job.data);
    console.log(add._id);

    // EMIT ALERTS
  }
}
