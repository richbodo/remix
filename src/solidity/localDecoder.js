'use strict'

function solidityLocals (vmtraceIndex, internalTreeCall, stack, memory) {
  var scope = internalTreeCall.findScope(vmtraceIndex)
  if (!scope) {
    return { 'error': 'Can\'t display locals. reason: compilation result might not have been provided' }
  }
  var locals = {}
  memory = formatMemory(memory)
  for (var local in scope.locals) {
    let variable = scope.locals[local]
    if (variable.type.decodeFromStack) {
      locals[variable.name] = variable.type.decodeFromStack(variable.stackDepth, stack, memory)
    } else {
      locals[variable.name] = ''
    }
  }
  return locals
}

function formatMemory (memory) {
  if (memory instanceof Array) {
    memory = memory.join('').replace(/0x/g, '')
  }
  return memory
}

module.exports = {
  solidityLocals: solidityLocals
}
