import { IDetector } from 'types/detector';

class ImperialDetector implements IDetector {

    public readonly regex = /([0-9]+)\s?miles/;

    public detect(message: string): RegExpExecArray | null {
        return this.regex.exec(message);
    }
}

export { ImperialDetector };