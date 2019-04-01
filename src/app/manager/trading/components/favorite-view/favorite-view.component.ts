import { Component, Input, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-favorite-view',
  templateUrl: './favorite-view.component.html',
  styleUrls: ['./favorite-view.component.scss'],
})
export class FavoriteViewComponent implements OnInit {

  @Input()
  rowData: any;

  faStar = faStar;

  favorite: boolean;

  constructor() {
  }

  get color() {
    return this.favorite ? 'orange' : 'black';
  }

  ngOnInit() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const favIndex = favorites.indexOf(this.rowData.pair);
    this.favorite = favIndex !== -1;
  }

  select(favId) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const favIndex = favorites.indexOf(favId);
    this.favorite = favIndex === -1;
    if (favIndex === -1) {
      favorites.push(favId);
    } else {
      favorites.splice(favIndex, 1);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}
