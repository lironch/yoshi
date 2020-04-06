import path from 'path';
import fs from 'fs-extra';
import { FlowEditorModel, ComponentModel } from '../model';
import widgetEntryTemplate from './templates/ComponentWidgetEntry';

const widgetWrapperPath = 'yoshi-flow-editor-runtime/build/WidgetWrapper.js';

const componentWrapper = (
  generatedWidgetEntriesPath: string,
  model: FlowEditorModel,
) => {
  return model.components.reduce(
    (acc: Record<string, string>, component: ComponentModel) => {
      if (!component.widgetFileName) {
        return acc;
      }

      const generatedWidgetEntryPath = path.join(
        generatedWidgetEntriesPath,
        `${component.name}Component.js`,
      );

      const generateWidgetEntryContent = widgetEntryTemplate({
        widgetWrapperPath,
        componentName: component.name,
        componentFileName: component.widgetFileName,
      });

      fs.outputFileSync(generatedWidgetEntryPath, generateWidgetEntryContent);

      acc[`${component.name}ViewerWidget`] = generatedWidgetEntryPath;

      return acc;
    },
    {},
  );
};

export default componentWrapper;
