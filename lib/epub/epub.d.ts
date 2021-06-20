import Book, { BookOptions } from "./types/book";

export default ePub;

declare function ePub(urlOrData: string | ArrayBuffer, options?: BookOptions) : Book;
declare function ePub(options?: BookOptions) : Book;
