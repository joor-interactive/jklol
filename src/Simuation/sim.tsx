import {Observable, Subject} from "rxjs";

export default class GameEvents {

    OnKeyPress: Subject<KeyboardEvent> = new Subject<KeyboardEvent>();
    $OnKeyPress : Observable<KeyboardEvent> = this.OnKeyPress.asObservable();

    OnProgress: Subject<Number> = new Subject<Number>();
    $OnProgress : Observable<Number> = this.OnProgress.asObservable();

    OnPullRequest: Subject<Number> = new Subject<Number>();
    $OnPullRequest : Observable<Number> = this.OnPullRequest.asObservable();
}
