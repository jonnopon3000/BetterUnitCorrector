/**
 * Initial testing class for imperial conversion
 */
class ImperialConverter {

    /**
     * convert a given mile value to KM
     * 
     * @param miles the miles to convert
     * 
     * @returns the converted KMs
     */
    public static convertMilesToKm(miles: number): number {
        return miles * 1.60934;
    }
}

export { ImperialConverter };