interface IDetector {
    readonly regex: RegExp;

    detect(message: string): RegExpExecArray | null;
}