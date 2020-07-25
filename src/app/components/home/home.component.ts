import { Component, OnInit } from '@angular/core';
import {MoviesService} from "../../services/movies.service";
import {MovieInterface} from "../interfaces/movie.interface";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  popularMovies : MovieInterface[] =[];
  moviesInBillboard: MovieInterface[] = [];
  topRated: MovieInterface[] = [];
  popularMoviesKids : any;

  constructor(private moviesService: MoviesService) {

    //popular movies
    moviesService.getPopular().subscribe( (popularMovies: MovieInterface[]) =>{
      this.popularMovies = popularMovies
    });
    // in billboard
    moviesService.getBillboard().subscribe( (billboard: MovieInterface[]) =>{
      this.moviesInBillboard = billboard;
    });

    // top Rated
    moviesService.getTopRated().subscribe( (topRated: MovieInterface[]) =>{
      this.topRated = topRated;
    });
    // popular for children
    moviesService.getPopularKids().subscribe( (popularKids: MovieInterface[]) =>{
      this.popularMoviesKids = popularKids;
    });
  }

  ngOnInit(): void {

  }

}
