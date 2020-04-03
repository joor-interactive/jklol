import {Observable, Subject} from "rxjs";
import {filter, map, scan} from "rxjs/operators";
import {PR_BATCH} from "./Settings";

export class ProgressUpdate {
   constructor(public progress: number, public percentToPr: number) {
   }
}

export default class GameEvents {

   OnKeyPress: Subject<KeyboardEvent> = new Subject<KeyboardEvent>();
   $OnKeyPress: Observable<KeyboardEvent> = this.OnKeyPress.asObservable();

   OnProgress: Subject<number> = new Subject<number>();
   $OnProgress: Observable<ProgressUpdate> = this
      .OnProgress.asObservable()
      .pipe(map(e => new ProgressUpdate(e, (e % PR_BATCH) / PR_BATCH)));

   OnPullRequest: Subject<number> = new Subject<number>();
   $OnPullRequest: Observable<number> = this.OnPullRequest.asObservable();

   constructor() {
      this.$OnKeyPress
         .pipe(map(() => 1))
         .pipe(scan((acc, current) => acc + current, 0))
         .subscribe(e => this.OnProgress.next(e));

      this.OnProgress.asObservable()
         .pipe(filter(e => e % PR_BATCH == 0))
         .subscribe(() => this.OnPullRequest.next(1));
   }
}
