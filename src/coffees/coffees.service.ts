import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['Chocolate', 'Vanilla'],
    },
  ];

  findAll(): Coffee[] {
    return this.coffees;
  }

  findOne(id: number): Coffee {
    const coffee = this.coffees.find(item => item.id === id);
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto): void {
    this.coffees.push({
      id: Math.floor(Math.random() * Math.floor(1000)),
      ...createCoffeeDto,
    });
  }

  update(id: number, updateCoffeeDto: UpdateCoffeeDto): void {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      const index = this.coffees.findIndex(item => item.id === id);
      this.coffees[index] = { ...existingCoffee, ...updateCoffeeDto };
    }
  }

  remove(id: number): void {
    const coffeeIndex = this.coffees.findIndex(item => item.id === id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
