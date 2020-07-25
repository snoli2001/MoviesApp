import { Component, OnInit, Input } from '@angular/core';
import {MovieInterface} from "../../interfaces/movie.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-movie-galery',
  templateUrl: './movie-galery.component.html',
  styleUrls: ['./movie-galery.component.css']
})
export class MovieGaleryComponent implements OnInit {
  loading = true;
  @Input('movies') movies: MovieInterface[];
  @Input('title') title;
  constructor(private route :Router) {

    console.log(this.loading);

  }

  ngOnInit(): void {
    if(this.movies != null ){
      this.loading = false;
      console.log(this.loading);
    }
  }

}
