#include <node_buffer.h>
#include <node.h>
#include <v8.h>
#include <RF24.h>

using namespace v8;



Handle<Value> Method(const Arguments& args) {
  HandleScope scope;
  RF24 radio(RPI_V2_GPIO_P1_15, RPI_V2_GPIO_P1_24, BCM2835_SPI_SPEED_8MHZ);
  return scope.Close(String::New("world"));
}

void Init(Handle<Object> exports) {
  exports->Set(String::NewSymbol("hello"),
      FunctionTemplate::New(Method)->GetFunction());
}

NODE_MODULE(hello, Init)