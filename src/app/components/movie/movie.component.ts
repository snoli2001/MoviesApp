import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute, convertToParamMap, Router} from "@angular/router";
import {MoviesService} from "../../services/movies.service";
import {MovieInterface} from "../interfaces/movie.interface";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movie: MovieInterface;
  recommended: MovieInterface[];
  id: string;
  url = 'http://image.tmdb.org/t/p/w500/'
  returnTo: string = "";
  loading= true;
  public video: string;
  public player: any;
  videoUrl: string = "";
  youtubeUrl = "https://www.youtube.com/embed/";
  valid = false;


  constructor( private router: ActivatedRoute,
               private moviesService: MoviesService,
               private routerLink : Router,private renderer: Renderer2) {

      //get id by the route
      this.router.params.subscribe( resp => {

          // id
          this.id = resp['id'];
          //
          this.returnTo = resp['page']
          //info movie
          this.moviesService.infoMovie(this.id).subscribe( (info: MovieInterface) => {
            this.movie = info;
          });

          //recommended
          this.moviesService.getRecommendations(this.id).subscribe( recommended => {
            this.recommended = recommended;
            this.loading = false;

            //get trailers
            this.moviesService.getTrailer(this.id).subscribe((trailers: any) =>{
                if( trailers[0].key != undefined) {
                  this.videoUrl = this.youtubeUrl + trailers[0].key;
                  this.video = trailers[0].key;
                  this.valid=true;
                }

            } );
          });

      }

      )


  }

  ngOnInit() {

  }



  stopVideo() {
    this.player.target.stopVideo();
  }
  savePlayer(player) {
    this.player = player;
    console.log('player instance', player);
    console.log(this.player)
  }
  onStateChange(event) {
    console.log('player state', event.data);
  }
  reloadMoviePage(id: number){
    this.routerLink.navigate(['/movie',id,'movie']);
    setTimeout(()=>{
      window.location.reload();
    },0.00000000001);
  }




}
