class MetricDetector implements IDetector {

    public readonly regex = /([0-9]+)\s?km/;

    public detect(message: string): RegExpExecArray | null {
        return this.regex.exec(message);
    }
}

export { MetricDetector };