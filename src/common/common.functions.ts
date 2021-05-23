import {BadRequestException} from "@nestjs/common";

export const checkError = (errors: any) => {
    if (errors.length) {
        const errMsg = 'Message Command validation error: ' + errors[0].toString();
        this.logger.error(errMsg);
        throw new BadRequestException(errMsg);
    }
}
