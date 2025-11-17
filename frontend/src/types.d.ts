// Type declarations to resolve module conflicts

declare module 'error-stack-parser' {
  export default class ErrorStackParser {
    static parse(error: Error): any[];
  }
}
