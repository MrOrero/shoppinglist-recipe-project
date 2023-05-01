import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  startedEditting = new Subject<number>();
  onIngredientAdded = new EventEmitter<any>();

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(name: string, amount: number) {
    console.log('addIngredient', name, amount);
    this.ingredients.push(new Ingredient(name, amount));
    this.onIngredientAdded.emit();
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.onIngredientAdded.emit();
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.onIngredientAdded.emit();
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.onIngredientAdded.emit();
  }
}
