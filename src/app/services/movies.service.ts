import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {map} from "rxjs/operators";
import {MovieInterface} from "../components/interfaces/movie.interface";


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiKey:string = 'e597c0924f5cc09ceffa894f3f0ae5c2';
  private urlMovieDb:string = "https://api.themoviedb.org/3"

  movies: MovieInterface[] = [];

  constructor(private http: HttpClient) { }

  getPopular() {
    let url = `${ this.urlMovieDb }/movie/popular?api_key=${ this.apiKey }&language=es&page=1`;
   // https://api.themoviedb.org/3/movie/popular?api_key=e597c0924f5cc09ceffa894f3f0ae5c2&language=es&page=1&region=pe
    return this.http.get(url).pipe(
      map (
        (x:any)=> x.results)
    );
  }
  getPopularKids() {
    let url = `${ this.urlMovieDb }/discover/movie?api_key=${ this.apiKey }&language=es&page=1&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=10751`;
    // https://api.themoviedb.org/3/discover/movie?api_key=e597c0924f5cc09ceffa894f3f0ae5c2&language=es&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=10751
    return this.http.get(url).pipe(
      map (
        (x:any)=> x.results)
    );
  }
  getBillboard(){
    // https://api.themoviedb.org/3/movie/now_playing?api_key=e597c0924f5cc09ceffa894f3f0ae5c2&language=es&page=1
      let url = `${ this.urlMovieDb }/movie/now_playing?api_key=${ this.apiKey }&language=es&page=1`;
      return this.http.get(url).pipe(
        map( (x:any) => x.results)
      );

  }

  getTopRated(){
    // https://api.themoviedb.org/3/movie/top_rated?api_key=e597c0924f5cc09ceffa894f3f0ae5c2&language=es&page=1
    let url = `${ this.urlMovieDb }/movie/top_rated?api_key=${ this.apiKey }&language=es&page=1`;
    return this.http.get(url).pipe(
      map( (x:any) => x.results)
    );
  }

  getRecommendations(id : string){
    // https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key=e597c0924f5cc09ceffa894f3f0ae5c2&language=en-US&page=1
    let url = `${ this.urlMovieDb }/movie/${id}/recommendations?api_key=${ this.apiKey }&language=es&page=1`;
    return this.http.get(url).pipe(
      map( (x:any) => x.results)
    );
  }

  infoMovie(id:string) {
    let url = `${ this.urlMovieDb }/movie/${id}?api_key=${ this.apiKey }&language=es`;
    return this.http.get(url);
  }

  searchMovie(texto: string) {

    let url = `${this.urlMovieDb}/search/movie?query=${texto}&sort_by=popularity.desc&api_key=${this.apiKey}&language=es`;

    return this.http.get(url).pipe(
      map((res:any) => {
        this.movies = res.results;
        return res.results;
      }));
  }

  getTrailer(id: any){
    let url = `${ this.urlMovieDb }/movie/${id}/videos?api_key=${ this.apiKey }&language=en-US`;
    return this.http.get(url).pipe(
      map((res:any) => {
        return res.results;
      }));
  }

}
