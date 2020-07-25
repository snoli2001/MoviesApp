import { Component, OnInit } from '@angular/core';
import {MoviesService} from "../../services/movies.service";
import { ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  search: string = '';

  constructor( public moviesService: MoviesService,
               public router: ActivatedRoute) {
    this.router.params.subscribe( params => {
      if(params['text']){
        this.search = params['text'];
        this.searchMovie();
      }
    });
  }

  ngOnInit(): void {
  }

  searchMovie() {
    if (this.search.length === 0) {
      console.log('inavlid');
      return;
    }
    this.moviesService.searchMovie(this.search)
      .subscribe()
  }

}
