#include <node.h>
#include <node_buffer.h>
#include <v8.h>

using namespace v8;
void init(Handle<Object> target) {
  target->Set(String::NewSymbol("create"), FunctionTemplate::New(create)->GetFunction());
}
NODE_MODULE(nrf-lib, init)

Handle<Value> create(const Arguments& args) {
 HandleScope scope;
 Handle<Object> ret = Object::New();

 node::Buffer *buf;
 return scope.Close(ret);
}