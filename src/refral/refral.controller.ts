import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { RefralService } from './refral.service';
import { CreateRefralDto } from './dto/create-refral.dto';
import { UpdateRefralDto } from './dto/update-refral.dto';

@Controller('refral')
export class RefralController {
  constructor(private readonly refralService: RefralService) {}

  @Post()
  create(@Body() createRefralDto: CreateRefralDto) {
    return this.refralService.create(createRefralDto);
  }

  @Get()
  
  async getRefral ( @Req() req,
  @Res() response,) {
    try {
      const userId = req.id;
      const result = await this.refralService.getrefral(userId);
      return response.status(200).json(result);
    } catch (error) {
      console.error('Error in get refral controller:', error.message);
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.refralService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRefralDto: UpdateRefralDto) {
    return this.refralService.update(+id, updateRefralDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.refralService.remove(+id);
  }
}
