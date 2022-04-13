//? Error al hacer post
export interface ErrorPost {
    headers:    Headers;
    status:     number;
    statusText: string;
    url:        string;
    ok:         boolean;
    name:       string;
    message:    string;
    error:      ErrorPostError;
}

export interface ErrorPostError {
    name:     string;
    errors:   ErrorElement[];
    parent:   Original;
    original: Original;
    fields:   Fields;
    sql:      string;
}

export interface ErrorElement {
    message:       string;
    type:          string;
    path:          string;
    value:         string;
    origin:        string;
    instance:      Instance;
    validatorKey:  string;
    validatorName: null;
    validatorArgs: any[];
}

export interface Instance {
    createdAt: AtedAt;
    updatedAt: AtedAt;
    id:        null;
    nombre:    string;
    apellidos: string;
    email:     string;
    password:  string;
    telefono:  string;
    cpostal:   string;
}

export interface AtedAt {
    fn:   string;
    args: any[];
}

export interface Fields {
    email: string;
}

export interface Original {
    code:       string;
    errno:      number;
    sqlState:   string;
    sqlMessage: string;
    sql:        string;
    parameters: string[];
}

export interface Headers {
    normalizedNames: NormalizedNames;
    lazyUpdate:      null;
}

export interface NormalizedNames {
}

//?