import { Pipe, PipeTransform } from '@angular/core';
import {MovieInterface} from "../components/interfaces/movie.interface";

@Pipe({
  name: 'movieImage'
})
export class MovieImagePipe implements PipeTransform {

  transform(movie: MovieInterface): any {

    let url = 'http://image.tmdb.org/t/p/w500/'

    if( movie.poster_path){
      return url + movie.poster_path
    } else {
      if( movie.backdrop_path) {
        return url + movie.backdrop_path
      }
      else return "assets/img/original.png";
    }
  }

}
