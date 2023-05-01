import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.recipe = this.recipeService.getRecipe(
        +this.route.snapshot.params['id']
      );
    });
  }

  toShoppingList(recipe: Recipe) {
    this.recipeService.addIngredient(recipe.ingredients);
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(+this.route.snapshot.params['id']);
    this.router.navigate(['/recipes']);
  }
}
