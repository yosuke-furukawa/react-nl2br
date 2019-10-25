import { ReactElement } from 'react';

// Accepts string
export default function nl2br(str: string): (string | ReactElement)[];

// Accepts any other type
export default function nl2br<T>(a: T): T;
