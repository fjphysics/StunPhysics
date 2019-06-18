import { Application, Canvas2DApplication } from "../../src/draw2d/Application";
import { CanvasKeyBoardEvent, CanvasMouseEvent } from "../../src/draw2d/application";
import * as sp from "../../src/StunPhysics"

class ApplicationTest extends Canvas2DApplication {
    public world:sp.World;

    public constructor ( canvas : HTMLCanvasElement  ) {
        super( canvas ) ;
        this.world = new sp.World();

        let circleBody = new sp.Body(this.world);
        circleBody.position.SetZero();
        circleBody.velocity.Set(10, 0);
        circleBody.Acceleration.Set(10, 0);
        this.world.addBody(circleBody);
    }
    
    protected dispatchKeyDown ( evt : CanvasKeyBoardEvent) : void {
       console . log ( " key : " + evt.key + " is down " ) ;
    }

    protected dispatchMouseDown ( evt : CanvasMouseEvent ) : void {
        console . log ( " canvasPosition : " + evt . canvasPosition ) ;
    }

    public update ( elapsedMsec : number , intervalSec : number ) : void {
        //console . log ( " elapsedMsec : " + elapsedMsec + " intervalSec : " + intervalSec ) ;
        this.world.step(intervalSec);
    }

    public render ( ) : void {
        //console . log ( " 调用render方法 " ) ;
        // clear the canvas with a transparent fill, to allow the canvas background to show
        this.context2D.globalCompositeOperation = 'source-in';
        this.context2D.fillStyle = "transparent";
        this.context2D.fillRect(0, 0, canvas.width, canvas.height);
        this.context2D.globalCompositeOperation = 'source-over';
        for (let i:number  = 0; i < this.world.bodies.length; i++) {
            let body:sp.Body=this.world.bodies[i];
            this.context2D.beginPath();
            this.context2D.arc(body.position.x, body.position.y, 20, 0, Math.PI * 2, false);
            this.context2D.strokeStyle = "rgb(255,0,0)";
            this.context2D.stroke();
                   }
        }
}

let canvas : HTMLCanvasElement | null = document.getElementById('canvas') as HTMLCanvasElement ;
let app : Application = new ApplicationTest ( canvas ) ;

app . update ( 0 , 0 ) ;
app . render ( ) ;


let startButton : HTMLButtonElement | null = document.getElementById('start') as HTMLButtonElement ;
let stopButton : HTMLButtonElement | null = document.getElementById ('stop') as HTMLButtonElement ;

startButton . onclick = ( ev : MouseEvent ) : void => {
    app . start ( ) ;
}

stopButton . onclick = ( ev : MouseEvent ) : void => {
    app . stop ( ) ;
}