/**
 * Initial testing class for metric conversion
 */
class MetricConverter {

    /**
     * convert a given KM value to Mile
     * 
     * @param kms the KMs to convert
     * 
     * @returns the converted Miles
     */
    public static convertKMsToMiles(kms: number): number {
        return kms * 0.621371;
    }
}

export { MetricConverter };