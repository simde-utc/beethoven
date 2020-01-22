import invariant from "invariant";
import { convertQuery } from "./helpers";

export class BaseURLScheme {
  constructor(base) {
    this.getBaseURL = base;
  }

  join(options, ...segments) {
    const base = this.getBaseURL(options);
    const [before, after] = base.slice(-1) === "/" ? ['', '/'] : ['/', ''];
    return segments.reduce((url, segment) => `${url}${before}${segment}${after}`, base)
  }
}

export class URLScheme extends BaseURLScheme {
  static fromString(base) {
    return new URLScheme(() => base)
  }

  getDetails(id, options, query=null) {
    invariant(id, `URLScheme expects ID not ${id}`);
    if(query) {
      query = typeof query === 'string' ? query : convertQuery(query);
    }

    return this.join(options, `${id}${query ? `?${query}` : ''}`);
  }

  getList(options, query=null) {
    if(query) {
      query = typeof query === 'string' ? query : convertQuery(query);
    }

    return `${this.getBaseURL(options)}${query ? `?${query}` : ''}`;
  }
}
