
using System;
using System.Collections.Generic;

public interface IDocument<C> where C : ICustomField
{
    Guid Id { get; set; }
}

public class Document : IDocument<CustomField>
{
    public string Other { get; set; }
}

public class CustomField: ICustomField
{
    public string Other { get; set; }
}

public interface ICustomField
{
    Guid Id { get; set; }
}


public interface IFolderContent<F, D, S, C>   where F : IFolder where C : ICustomField where D : IDocument<S, C>
{
    int TotalItems { get; set; }
    int NbItemPerPage { get; set; }
    int CurrentIndexPage { get; set; }
    F CurrentFolder { get; set; }
    List<F> Folders { get; set; }
    List<D> Documents { get; set; }
}