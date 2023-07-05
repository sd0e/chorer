import getSessionFeature, { Feature } from "./getSessionFeature";

export default function hasPrivileges() {
    return getSessionFeature(Feature.IsAdmin) || getSessionFeature(Feature.IsOwner);
}