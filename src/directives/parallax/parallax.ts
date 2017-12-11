import { Directive,ElementRef,Renderer } from '@angular/core';

/**
 * Generated class for the ParallaxDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[parallax]', // Attribute selector
  host:{
  	'(ionScroll)': 'onCntscroll($event)',
  }
})
export class ParallaxDirective {

  constructor(public el: ElementRef,public re: Renderer) {
    
  }
  header: any;
  main_cnt: any;
  ta: any;
  ngOnInit(){
  	let cnt = this.el.nativeElement.getElementsByClassname('scroll-content')[0];
  	this.header = cnt.getElementsByClassname('bg')[0];
  	this.main_cnt = cnt.getElementsByClassname('main-cnt')[0];

  	this.re.setElementStyle(this.header,'webTransformOrigin','center buttom');
  	this.re.setElementStyle(this.header,'background-size','cover');
  	this.re.setElementStyle(this.main_cnt,'position','absolute');
  }
  onCntscroll(ev){
  	ev.domWrite(()=>{
  		this.update(ev);
  	});
  }
  update(ev){
  	if (ev.scrollTop>0) {
  		this.ta = ev.scrollTop/2;
  		
  	}
  	this.re.setElementStyle(this.header,'webkitTransform','translate3d(0,'+ this.ta +'px,0) scale(1,1)')
  }
}
