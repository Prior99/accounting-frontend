import { component, factory } from "tsdi";
import { createBrowserHistory, History } from "history";

@component
export class HistoryFactory {
    @factory
    public createHistory(): History {
        return createBrowserHistory();
    }
}
