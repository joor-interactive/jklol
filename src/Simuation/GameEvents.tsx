import {Observable, partition, Subject} from "rxjs";
import {filter, groupBy, map, scan} from "rxjs/operators";
import {PR_BATCH} from "./Settings";

export class ProgressUpdate {
   constructor(public progress: number, public percentToPr: number) {
   }
}

export default class GameEvents {

   OnKeyPress: Subject<KeyboardEvent> = new Subject<KeyboardEvent>();
   $OnKeyPress: Observable<KeyboardEvent> = this.OnKeyPress.asObservable();

   OnProgress: Subject<number> = new Subject<number>();
   $OnTotalProgress : Observable<number> = this.OnProgress.asObservable()
      .pipe(scan((acc, current) => acc + current, 0));

   $OnProgressUpdate: Observable<ProgressUpdate> = this
      .$OnTotalProgress
      .pipe(map(e => new ProgressUpdate(e, (e % PR_BATCH) / PR_BATCH)));

   OnPullRequest: Subject<number> = new Subject<number>();
   $OnPullRequest: Observable<number> = this.OnPullRequest.asObservable();

   constructor() {
      this.$OnKeyPress
         .pipe(map(() => 1))
         .subscribe(e => this.OnProgress.next(e));

      this.$OnTotalProgress
         .pipe(map(e => e / PR_BATCH))
         .pipe(groupBy((e) => Math.floor(e)))
         .pipe(filter(e => e.key > 0))
         .subscribe(() => this.OnPullRequest.next(1));
   }
}
