export JAVA_OPTS='-XX:+IgnoreUnrecognizedVMOptions --add-modules java.se.ee'

#avdmanager -v create avd -n DAV -k "system-images;android-27;google_apis;x86"

avdmanager list avd
emulator @Nexus_5X_API_28_x86