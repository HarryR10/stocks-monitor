import {Inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PathBuilderService} from "../services/path-builder-service/path-builder.service";
import {Observable} from "rxjs";


export abstract class ApiKey {

    public isValid: boolean;

    protected constructor(public keyName: string,
                          public keyDescription: string,
                          public keyValue: string) {
    }

    public abstract verify(http: HttpClient, pathBuilder: PathBuilderService): Observable<void>;
}

